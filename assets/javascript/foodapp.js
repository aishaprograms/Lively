var foods = {
    nuts: ['cashews', 'almonds', 'hazelnuts',
        'brazil nuts', 'peanut butter', 'pumpkin seeds',
        'walnuts'
    ],
    meats: ['lean pork', 'lean beef', ' chicken',
        'turkey', 'salmon', 'eggs', 'tuna'
    ],
    vegetables: ['leafy greens', 'spinach', 'romaine',
        'sweet potato', 'edamame', 'asparagus'
    ],
    grains: ['oatmeal', 'popcorn',
        'brown rice', 'beans', 'legumes', 'whole grain cereal',
        'quinoa'
    ],
    fruits: ['bananas', 'apples', 'oranges', 'blueberries',
        'melons'
    ],
    quickFixes: ['caffeine', 'sugar', 'coffee', 'tea',
        'chocolate', 'honey'
    ],
    dairy: ['yogurt', 'cheese']
};

Object.keys(foods).forEach(function(food) {
    foods[food].forEach(function(item) {
        foodObjects.push(new FoodObj(item.name, item.img, item.info));
    });
});
