'use strict';

// Starter Menu Data
const menu = [
  {
    category: 'Beverages',
    items: [
      { name: 'Coffee', price: 3.5 },
      { name: 'Tea', price: 2.5 },
      { name: 'Juice', price: 4 },
    ],
  },
  {
    category: 'Pastries',
    items: [
      { name: 'Croissant', price: 2.75 },
      { name: 'Muffin', price: 2.5 },
      { name: 'Bagel', price: 2.25 },
    ],
  },
  {
    category: 'Sandwiches',
    items: [
      { name: 'Ham Sandwich', price: 5.5 },
      { name: 'Veggie Sandwich', price: 5 },
      { name: 'Turkey Sandwich', price: 6 },
    ],
  },
];

// ===== SOLUTION FOR TEST 1 =====
/**
 * Recursively lists all menu items' names.
 * @param {Array} menu - The multi-dimensional menu array.
 * @returns {Array} - Flat array of all item names.
 */
const listMenuItems = (menu) => {
  if (menu.length === 0) {
    return [];
  }

  const [firstCategory, ...restCategories] = menu;
  const names = firstCategory.items.map((item) => item.name);

  return [...names, ...listMenuItems(restCategories)];
};

// ===== SOLUTION FOR TEST 2 =====
/**
 * Calculates the average price of all menu items.
 * @param {Array} menu - The multi-dimensional menu array.
 * @returns {number} - Average price.
 */
const calculateAveragePrice = (menu) => {
  const allItems = getAllItemsWithDetails(menu);
  const total = sumPrices(allItems);
  const average = total / allItems.length;
  return average.toFixed(2);
};

/**
 * Recursively lists all menu items with details.
 * @param {Array} menu - The multi-dimensional menu array.
 * @returns {Array} - Flat array of all items with name and price.
 */
const getAllItemsWithDetails = (menu) => {
  if (menu.length === 0) {
    return [];
  }

  const [firstCategory, ...restCategories] = menu;
  const items = firstCategory.items.map((item) => ({
    name: item.name,
    price: item.price,
  }));

  return [...items, ...getAllItemsWithDetails(restCategories)];
};

/**
 * Recursively sums the prices of all items.
 * @param {Array} items - Array of item objects with price.
 * @param {number} index - Current index in the items array.
 * @returns {number} - Total sum of prices.
 */
const sumPrices = (items, index = 0) => {
  if (index >= items.length) {
    return 0;
  }

  return items[index].price + sumPrices(items, index + 1);
};

// ===== SOLUTION FOR TEST 3 =====
/**
 * Recursively finds all items in a specified category.
 * @param {Array} menu - The multi-dimensional menu array.
 * @param {string} categoryName - The name of the category to search.
 * @returns {Array} - Array of item objects in the specified category.
 */
const findItemsByCategory = (menu, categoryName) => {
  if (menu.length === 0) {
    return [];
  }

  const [firstCategory, ...restCategories] = menu;
  let found = [];

  if (firstCategory.category.toLowerCase() === categoryName.toLowerCase()) {
    found = firstCategory.items.map((item) => ({
      name: item.name,
      price: item.price,
    }));
  }

  return [...found, ...findItemsByCategory(restCategories, categoryName)];
};

// ===== TEST CASES =====

// 1. List All Menu Items
const menuItems = listMenuItems(menu);
console.log('All Menu Items:\n', menuItems);

// 2. Calculate Average Price
const averagePrice = calculateAveragePrice(menu);
console.log('Average Price of All Items:', averagePrice);

// 3. Find Items by Category
const searchCategory = 'Pastries';
const pastries = findItemsByCategory(menu, searchCategory);
console.log(`Items in "${searchCategory}" \nItems:`, pastries);

/*
===== EXPECTED OUTPUT =====

All Menu Items:
[
  'Coffee',
  'Tea',
  'Juice',
  'Croissant',
  'Muffin',
  'Bagel',
  'Ham Sandwich',
  'Veggie Sandwich',
  'Turkey Sandwich'
]

Average Price of All Items: 3.78

Items in "Pastries" 
Items: [
  { name: 'Croissant', price: 2.75 },
  { name: 'Muffin', price: 2.5 },
  { name: 'Bagel', price: 2.25 }
]
*/
