import { validateDictionaryConsistency } from './index';
import {
  ERR_DUPLICATE_ROW,
  ERR_FORK,
  ERR_CYCLE,
  ERR_CHAIN
} from '../constants/ErrorTypes';

import {
  consistentDict,
  dupRowsDict,
  multDupRowsDict,
  forkDict,
  multForkDict,
  cycleDict,
  multCycleDict,
  chainDict,
  multChainDict
} from '../data/dictionaryConsistencyTestData';

describe('validateDictionaryConsistency()', () => {
  describe('Valid rows', () => {
    it('does not detect an error on a consistend dictionary', () => {
      const errors = validateDictionaryConsistency(consistentDict);
      expect(errors).toHaveLength(0);
    });
  });

  describe('Duplicate rows', () => {
    it('detects a pair of duplicate rows', () => {
      const errors = validateDictionaryConsistency(dupRowsDict);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toEqual({
        type: ERR_DUPLICATE_ROW,
        indexA: 0,
        indexB: 1
      });
    });

    it('detects more than one pair of duplicate rows', () => {
      const errors = validateDictionaryConsistency(multDupRowsDict);
      expect(errors).toHaveLength(3);
      expect(errors[0]).toEqual({
        type: ERR_DUPLICATE_ROW,
        indexA: 0,
        indexB: 1
      });
      expect(errors[1]).toEqual({
        type: ERR_DUPLICATE_ROW,
        indexA: 3,
        indexB: 4
      });
      expect(errors[2]).toEqual({
        type: ERR_DUPLICATE_ROW,
        indexA: 5,
        indexB: 7
      });
    });
  });

  describe('Forks', () => {
    it('detects a fork', () => {
      const errors = validateDictionaryConsistency(forkDict);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toEqual({ type: ERR_FORK, indexA: 0, indexB: 1 });
    });

    it('detects multiple forks', () => {
      const errors = validateDictionaryConsistency(multForkDict);
      expect(errors).toHaveLength(5);
      expect(errors[0]).toEqual({ type: ERR_FORK, indexA: 0, indexB: 1 });
      expect(errors[1]).toEqual({ type: ERR_FORK, indexA: 0, indexB: 7 });
      expect(errors[2]).toEqual({ type: ERR_FORK, indexA: 1, indexB: 7 });
      expect(errors[3]).toEqual({ type: ERR_FORK, indexA: 3, indexB: 8 });
      expect(errors[4]).toEqual({ type: ERR_FORK, indexA: 4, indexB: 6 });
    });
  });

  describe('Cycles', () => {
    it('detects a cycle', () => {
      // we filter the errors cause cycle errors are a subset
      // of chain errors
      const errors = validateDictionaryConsistency(cycleDict)
        .filter(err => err.type === ERR_CYCLE );
      expect(errors).toHaveLength(1);
      expect(errors[0]).toEqual({ type: ERR_CYCLE, indexA: 0, indexB: 1 });
    });

    it('detects multiple forks', () => {
      const errors = validateDictionaryConsistency(multCycleDict)
        .filter(err => err.type === ERR_CYCLE );

      expect(errors).toHaveLength(3);
      expect(errors[0]).toEqual({ type: ERR_CYCLE, indexA: 0, indexB: 1 });
      expect(errors[1]).toEqual({ type: ERR_CYCLE, indexA: 1, indexB: 3 });
      expect(errors[2]).toEqual({ type: ERR_CYCLE, indexA: 4, indexB: 6 });
    });
  });

  describe('Chains', () => {
    it('detects a chain', () => {
      const errors = validateDictionaryConsistency(chainDict);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toEqual({ type: ERR_CHAIN, indexA: 0, indexB: 1 });
    });

    it('detects multiple chains', () => {
      const errors = validateDictionaryConsistency(multChainDict);

      expect(errors).toHaveLength(3);
      expect(errors[0]).toEqual({ type: ERR_CHAIN, indexA: 0, indexB: 1 });
      expect(errors[1]).toEqual({ type: ERR_CHAIN, indexA: 1, indexB: 3 });
      expect(errors[2]).toEqual({ type: ERR_CHAIN, indexA: 4, indexB: 7 });
    });
  });
});
