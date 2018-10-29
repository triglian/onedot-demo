import {
  ERR_DUPLICATE_ROW,
  ERR_FORK,
  ERR_CYCLE,
  ERR_CHAIN
} from '../constants/ErrorTypes.js';


export const validateDictionaryConsistency = rows => {
  const errors = [];
  rows.forEach((rowA, idxA) => {
    if (idxA < rows.length - 1) {
      rows.slice(idxA + 1).forEach((rowB, idxB) => {
        // Duplicate rows
        if (rowA.domain === rowB.domain && rowA.range === rowB.range) {
          errors.push({
            type: ERR_DUPLICATE_ROW,
            indexA: idxA,
            indexB: idxA + idxB + 1
          });
        }

        // Forks
        if (rowA.domain === rowB.domain && rowA.range !== rowB.range) {
          errors.push({ type: ERR_FORK, indexA: idxA, indexB: idxA + idxB + 1 });
        }

        // Cycles
        if (rowA.domain === rowB.range && rowA.range === rowB.domain) {
          errors.push({ type: ERR_CYCLE, indexA: idxA, indexB: idxA + idxB + 1 });
        }

        // Chains
        if (rowA.range === rowB.domain) {
          errors.push({ type: ERR_CHAIN, indexA: idxA, indexB: idxA + idxB + 1 });
        }
      });
    }
  });
  return errors;
};
