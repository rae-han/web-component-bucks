let categories = [
  { 
    id: 'espresso',
    text: '☕ 에스프레소',
    menu: [
      { id: 1, name: 'Espresso', isSoldOut: true, },
      { id: 2, name: 'Americano', isSoldOut: false, },
      { id: 3, name: 'Caffè Latte', isSoldOut: true, },
      { id: 4, name: 'Cappuccino', isSoldOut: false, },
    ]
  },
  { 
    id: 'frappuccino',
    text: '🥤 프라푸치노',
    menu: []
  },
  { 
    id: 'blended',
    text: '🍹 블렌디드',
    menu: []
  },
  { 
    id: 'teavana',
    text: '🫖 티바나',
    menu: []
  },
  { 
    id: 'desert',
    text: '🍰 디저트',
    menu: []
  },
];

export default categories;