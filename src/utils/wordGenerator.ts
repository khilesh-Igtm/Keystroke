// Word lists for different difficulty levels
const easyWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with',
  'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if',
  'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just',
  'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
  'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want',
  'because', 'any', 'these', 'give', 'day', 'most', 'us'
]

const mediumWords = [
  'through', 'where', 'much', 'should', 'before', 'move', 'right', 'boy', 'old', 'too', 'same',
  'tell', 'does', 'set', 'three', 'must', 'word', 'high', 'every', 'near', 'add', 'food',
  'between', 'under', 'never', 'below', 'saw', 'something', 'thought', 'both', 'few', 'those',
  'always', 'show', 'large', 'often', 'together', 'asked', 'house', 'world', 'going', 'here',
  'turn', 'during', 'place', 'right', 'started', 'system', 'program', 'heard', 'question',
  'works', 'different', 'small', 'number', 'government', 'company', 'group', 'problem',
  'important', 'business', 'become', 'member', 'water', 'happen', 'night', 'point', 'today',
  'bring', 'nothing', 'stay', 'let', 'put', 'end', 'why', 'try', 'kind', 'hand', 'picture',
  'again', 'change', 'off', 'play', 'spell', 'air', 'away', 'animal', 'page', 'mother',
  'study', 'still', 'learn', 'should', 'america', 'around'
]

const hardWords = [
  'particularly', 'definitely', 'immediately', 'unfortunately', 'environment', 'development',
  'government', 'management', 'information', 'international', 'experience', 'understand',
  'technology', 'appropriate', 'significant', 'organization', 'opportunity', 'community',
  'responsibility', 'recommendation', 'relationship', 'characteristic', 'administration',
  'communication', 'representative', 'transportation', 'infrastructure', 'implementation',
  'sophisticated', 'consciousness', 'automatically', 'fundamentally', 'approximately',
  'extraordinary', 'overwhelming', 'revolutionary', 'unprecedented', 'psychological',
  'philosophical', 'controversial', 'constitutional', 'environmental', 'technological',
  'systematically', 'transformation', 'specification', 'documentation', 'manufacturing',
  'pharmaceutical', 'archaeological', 'anthropological', 'entrepreneurial', 'simultaneously',
  'incomprehensible', 'institutionalization', 'internationalization', 'characterization',
  'professionalization', 'compartmentalization', 'intercommunication', 'straightforward',
  'acknowledgment', 'establishment', 'entertainment', 'requirements', 'breakthrough',
  'neighborhood', 'championship', 'headquarters', 'circumstances', 'temperature',
  'achievement', 'announcement', 'arrangement', 'assignment', 'attachment', 'commitment',
  'department', 'equipment', 'excitement', 'experiment', 'improvement', 'instrument',
  'investment', 'movement', 'parliament', 'statement', 'treatment', 'agreement'
]

export type Difficulty = 'easy' | 'medium' | 'hard'

export function generateWords(count: number, difficulty: Difficulty): string[] {
  let wordList: string[]
  
  switch (difficulty) {
    case 'easy':
      wordList = easyWords
      break
    case 'medium':
      wordList = [...easyWords, ...mediumWords]
      break
    case 'hard':
      wordList = [...easyWords, ...mediumWords, ...hardWords]
      break
    default:
      wordList = mediumWords
  }

  const words: string[] = []
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length)
    words.push(wordList[randomIndex])
  }
  
  return words
}

export function getWordListStats(difficulty: Difficulty) {
  switch (difficulty) {
    case 'easy':
      return {
        totalWords: easyWords.length,
        avgLength: easyWords.reduce((sum, word) => sum + word.length, 0) / easyWords.length,
        description: 'Common words with 2-5 characters'
      }
    case 'medium':
      const mediumList = [...easyWords, ...mediumWords]
      return {
        totalWords: mediumList.length,
        avgLength: mediumList.reduce((sum, word) => sum + word.length, 0) / mediumList.length,
        description: 'Mix of common and intermediate words'
      }
    case 'hard':
      const hardList = [...easyWords, ...mediumWords, ...hardWords]
      return {
        totalWords: hardList.length,
        avgLength: hardList.reduce((sum, word) => sum + word.length, 0) / hardList.length,
        description: 'Complex words with 8+ characters'
      }
    default:
      return {
        totalWords: 0,
        avgLength: 0,
        description: 'Unknown difficulty'
      }
  }
}