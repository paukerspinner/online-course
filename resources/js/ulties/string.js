import { QUESTION_LEVEL as LEVEL } from '../constants';

export const stringOfTestLevel = test_level => {
    switch(test_level) {
        case LEVEL.EASY:
            return 'Easy';
        case LEVEL.MEDIUM:
            return 'Medium';
        case LEVEL.HARD:
            return 'Difficult';
    }
}