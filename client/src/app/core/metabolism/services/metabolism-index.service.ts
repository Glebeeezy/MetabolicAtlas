import { Injectable } from '@angular/core';
import {
  HumanMetaboliteNode,
  HumanReactionArrow,
} from '../models';
import {
  ALL_METABOLITES,
  HUMAN_REACTIONS,
} from '../../../data/metabolism';

export interface MetaboliteReactionParticipation {
  rx: HumanReactionArrow;
  role: 'substrate' | 'product';
}

/**
 * Fast indexing service providing O(1) graph navigation, cross-referencing,
 * and search queries across metabolites and biochemical reactions.
 */
@Injectable({
  providedIn: 'root',
})
export class MetabolismIndexService {
  private readonly metaboliteByIdMap = new Map<string, HumanMetaboliteNode>();
  private readonly metaboliteByCodeMap = new Map<string, HumanMetaboliteNode>();
  private readonly metaboliteByNameMap = new Map<string, HumanMetaboliteNode>();

  private readonly reactionByIdMap = new Map<string, HumanReactionArrow>();
  private readonly reactionByCodeMap = new Map<string, HumanReactionArrow>();

  private readonly reactionsByMetaboliteIdMap = new Map<string, MetaboliteReactionParticipation[]>();
  private readonly reactionsByPathwayCodeMap = new Map<string, HumanReactionArrow[]>();
  private readonly metabolitesByPathwayCodeMap = new Map<string, HumanMetaboliteNode[]>();

  constructor() {
    this.buildIndexes(ALL_METABOLITES, HUMAN_REACTIONS);
  }

  private buildIndexes(
    metabolites: readonly HumanMetaboliteNode[],
    reactions: readonly HumanReactionArrow[]
  ): void {
    // 1. Metabolite primary indices
    for (const met of metabolites) {
      this.metaboliteByIdMap.set(met.id, met);
      this.metaboliteByCodeMap.set(met.code, met);
      if (met.nameRu) this.metaboliteByNameMap.set(met.nameRu.toLowerCase(), met);
      if (met.nameEn) this.metaboliteByNameMap.set(met.nameEn.toLowerCase(), met);

      // Metabolite -> Pathway index
      if (met.pathwaysRu) {
        for (const p of met.pathwaysRu) {
          let list = this.metabolitesByPathwayCodeMap.get(p.pathwayCode);
          if (!list) {
            list = [];
            this.metabolitesByPathwayCodeMap.set(p.pathwayCode, list);
          }
          if (!list.some((m) => m.id === met.id)) {
            list.push(met);
          }
        }
      }
    }

    // 2. Reaction primary indices
    for (const rx of reactions) {
      this.reactionByIdMap.set(rx.id, rx);
      this.reactionByCodeMap.set(rx.code, rx);

      // Pathway -> Reactions index
      if (rx.pathwayCode) {
        let rxList = this.reactionsByPathwayCodeMap.get(rx.pathwayCode);
        if (!rxList) {
          rxList = [];
          this.reactionsByPathwayCodeMap.set(rx.pathwayCode, rxList);
        }
        rxList.push(rx);
      }

      // 3. Metabolite <-> Reaction relational index
      this.registerParticipation(rx.sourceMetaboliteId, rx, 'substrate');
      if (rx.secondarySourceId) {
        this.registerParticipation(rx.secondarySourceId, rx, 'substrate');
      }

      this.registerParticipation(rx.targetMetaboliteId, rx, 'product');
      if (rx.secondaryTargetId) {
        this.registerParticipation(rx.secondaryTargetId, rx, 'product');
      }

      if (rx.branches) {
        for (const b of rx.branches) {
          const role = b.role === 'in' ? 'substrate' : 'product';
          this.registerParticipation(b.metaboliteId, rx, role);
        }
      }
    }
  }

  private registerParticipation(
    metaboliteId: string,
    rx: HumanReactionArrow,
    role: 'substrate' | 'product'
  ): void {
    let list = this.reactionsByMetaboliteIdMap.get(metaboliteId);
    if (!list) {
      list = [];
      this.reactionsByMetaboliteIdMap.set(metaboliteId, list);
    }
    // Prevent duplicate entries for the same reaction
    if (!list.some((item) => item.rx.id === rx.id && item.role === role)) {
      list.push({ rx, role });
    }
  }

  // Retrieval methods
  getMetaboliteById(id: string): HumanMetaboliteNode | undefined {
    return this.metaboliteByIdMap.get(id);
  }

  getMetaboliteByCode(code: string): HumanMetaboliteNode | undefined {
    return this.metaboliteByCodeMap.get(code);
  }

  findMetaboliteByName(name: string): HumanMetaboliteNode | undefined {
    if (!name) return undefined;
    return this.metaboliteByNameMap.get(name.trim().toLowerCase());
  }

  getReactionById(id: string): HumanReactionArrow | undefined {
    return this.reactionByIdMap.get(id);
  }

  getReactionByCode(code: string): HumanReactionArrow | undefined {
    return this.reactionByCodeMap.get(code);
  }

  getReactionsForMetabolite(metaboliteId: string): MetaboliteReactionParticipation[] {
    return this.reactionsByMetaboliteIdMap.get(metaboliteId) ?? [];
  }

  getReactionsByPathway(pathwayCode: string): HumanReactionArrow[] {
    return this.reactionsByPathwayCodeMap.get(pathwayCode) ?? [];
  }

  getMetabolitesByPathway(pathwayCode: string): HumanMetaboliteNode[] {
    return this.metabolitesByPathwayCodeMap.get(pathwayCode) ?? [];
  }
}
