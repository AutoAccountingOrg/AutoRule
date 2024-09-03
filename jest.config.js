export default {
  // 其他 Jest 配置选项...
  "transform": {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  "moduleNameMapper": {
    '^common(.*)$': '<rootDir>/src/utils$1'
  }
};
