const { get } = require('./main');
const { BillType } = require('../utils/BillType');

//支出项目

//三餐
test('分类：三餐(早餐)', () => {
  let result = get(0.01, BillType.Expend, '安阳早餐店', '人肉叉烧包', '6:30');

  expect(result).toEqual({ "book": '默认账本', "category": '早餐' });
});

test('分类：三餐(早茶)', () => {
  let result = get(0.01, BillType.Expend, '手抓饼', '双蛋煎饼', '9:40');

  expect(result).toEqual({ "book": '默认账本', "category": '早茶' });
});

test('分类：三餐(午餐)', () => {
  let result = get(0.01, BillType.Expend, '和平里大饭店', '', '11:40');

  expect(result).toEqual({ "book": '默认账本', "category": '午餐' });
});

test('分类：三餐(下午茶)', () => {
  let result = get(0.01, BillType.Expend, '煎饼果子', '', '14:40');

  expect(result).toEqual({ "book": '默认账本', "category": '下午茶' });
});

test('分类：三餐(晚餐)', () => {
  let result = get(0.01, BillType.Expend, '和府捞面', '捞派肥牛', '16:30');

  expect(result).toEqual({ "book": '默认账本', "category": '晚餐' });
});

test('分类：三餐(夜宵)', () => {
  let result = get(0.01, BillType.Expend, '大排档', '炒饭', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '夜宵' });
});

test('分类：电器数码', () => {
  let result = get(0.01, BillType.Expend, '美的空调', '美的001', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '电器数码' });
});

test('分类：电器数码', () => {
  let result = get(0.01, BillType.Expend, 'Macbook Pro', 'Apple', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '电器数码' });
});

test('分类：运动', () => {
  let result = get(0.01, BillType.Expend, 'xx健身房', '年卡充值', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '运动' });
});

test('分类：房租', () => {
  let result = get(0.01, BillType.Expend, 'xx房东', '3月租金', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '房租' });
});

test('分类：零食', () => {
  let result = get(0.01, BillType.Expend, 'xxx吃货铺', '伟龙辣条', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '零食' });
});

test('分类：零食', () => {
  let result = get(0.01, BillType.Expend, '星巴克', '1号xxxxx', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '饮料' });
});

test('分类：水果', () => {
  let result = get(0.01, BillType.Expend, 'xx店', '阳光玫瑰', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '水果' });
});

test('分类：快递', () => {
  let result = get(0.01, BillType.Expend, '菜鸟裹裹', '兔喜生活', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '快递' });
});

test('分类：网购代付', () => {
  let result = get(0.01, BillType.Expend, '亲情卡', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '网购代付' });
});

test('分类：烟酒', () => {
  let result = get(0.01, BillType.Expend, '剑南春', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '烟酒' });
});

test('分类：搬家', () => {
  let result = get(0.01, BillType.Expend, '货拉拉', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '搬家' });
});

test('分类：购物', () => {
  let result = get(0.01, BillType.Expend, '苏润万家购物中心', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '购物' });
});

test('分类：党费会费', () => {
  let result = get(0.01, BillType.Expend, 'xxx团费', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '党费会费' });
});

test('分类：话费网费', () => {
  let result = get(0.01, BillType.Expend, '北京联通', '在线缴费', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '话费网费' });
});

test('分类：水电煤', () => {
  let result = get(
    0.01,
    BillType.Expend,
    '北京2023期燃气费',
    '在线缴费',
    '22:00'
  );

  expect(result).toEqual({ "book": '默认账本', "category": '水电煤' });
});

test('分类：保险', () => {
  let result = get(0.01, BillType.Expend, '中国人寿保险', '在线缴费', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '保险' });
});

test('分类：穿戴', () => {
  let result = get(0.01, BillType.Expend, '优衣库', '在线缴费', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '穿戴' });
});

test('分类：理发', () => {
  let result = get(0.01, BillType.Expend, 'xxx造型师', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '理发' });
});

test('分类：护肤美妆', () => {
  let result = get(0.01, BillType.Expend, '大宝SOD蜜', '', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '护肤美妆' });
});

test('分类：付费会员', () => {
  let result = get(0.01, BillType.Expend, 'QQ音乐', '绿钻会员', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '付费会员' });
});

test('分类：购买App', () => {
  let result = get(
    0.01,
    BillType.Expend,
    '自动记账专业版',
    '自动记账',
    '22:00'
  );

  expect(result).toEqual({ "book": '默认账本', "category": '购买App' });
});

test('分类：游戏', () => {
  let result = get(0.01, BillType.Expend, '腾讯充值', '100点券', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '游戏' });
});

test('分类：小说漫画', () => {
  let result = get(0.01, BillType.Expend, '起点中文网', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '小说漫画' });
});

test('分类：电影', () => {
  let result = get(0.01, BillType.Expend, '环球影城', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '电影' });
});

test('分类：旅行', () => {
  let result = get(0.01, BillType.Expend, '希尔顿', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '旅行' });
});

test('分类：打赏', () => {
  let result = get(0.01, BillType.Expend, '虎牙直播', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '打赏' });
});

test('分类：聚会', () => {
  let result = get(0.01, BillType.Expend, '海底捞', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '聚会' });
});

test('分类：收藏', () => {
  let result = get(0.01, BillType.Expend, 'xx手办店', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '收藏' });
});

test('分类：娱乐', () => {
  let result = get(0.01, BillType.Expend, 'xx娱乐会所', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '娱乐' });
});

test('分类：医疗', () => {
  let result = get(0.01, BillType.Expend, 'xx妇幼保健院', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '医疗' });
});

test('分类：学习', () => {
  let result = get(0.01, BillType.Expend, '《Ankioの自传》', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '学习' });
});

test('分类：罚款', () => {
  let result = get(0.01, BillType.Expend, '上海交警', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '罚款' });
});

test('分类：捐赠', () => {
  let result = get(0.01, BillType.Expend, '韩红慈善基金会', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '捐赠' });
});

test('分类：公交地铁', () => {
  let result = get(0.01, BillType.Expend, '京津冀一卡通', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '公交地铁' });
});

test('分类：打车', () => {
  let result = get(0.01, BillType.Expend, '滴滴出行', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '打车' });
});

test('分类：火车', () => {
  let result = get(0.01, BillType.Expend, '高铁管家', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '火车' });
});

test('分类：飞机', () => {
  let result = get(0.01, BillType.Expend, '东方航空', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '飞机' });
});

test('分类：汽车加油', () => {
  let result = get(0.01, BillType.Expend, 'xxx加油站', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '汽车加油' });
});

test('分类：育儿', () => {
  let result = get(0.01, BillType.Expend, 'xx儿童乐园', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '育儿' });
});

test('分类：发红包', () => {
  let result = get(0.01, BillType.Expend, '发红包', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '发红包' });
});
//收入部分的分类

test('分类：工资', () => {
  let result = get(0.01, BillType.Income, 'xxx年终奖', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '工资' });
});

test('分类：退款', () => {
  let result = get(0.01, BillType.Income, 'xxx商品退款', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '退款' });
});

test('分类：公积金', () => {
  let result = get(0.01, BillType.Income, 'xxxx公积金', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '公积金' });
});

test('分类：外快', () => {
  let result = get(0.01, BillType.Income, '拼多多', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '外快' });
});

test('分类：快赎理财', () => {
  let result = get(0.01, BillType.Income, '余利宝2日收益', '1000章', '22:00');

  expect(result).toEqual({ "book": '默认账本', "category": '快赎理财' });
});

test('分类：收红包', () => {
  let result = get(0.01, BillType.Income, '来自从前慢', '普通红包', '16:00');

  expect(result).toEqual({ "book": '默认账本', "category": '收红包' });
});
