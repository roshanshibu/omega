# Omega

Lizt - A shopping list webapp

### Build Instructions

Install dependencies with `npm install`  
Run with `npm run dev`

---

### Todo

- [x] QR Scanner component design conformity
- [x] Search bar component with switchable text input and QR Scanner
- [x] Text Search suggestions view
- [x] Implement database
  - [x] Design document db storage schema
- [x] Fetch data from db
- [x] Add items to db
- [x] Update data in db
- [x] search suggestions
- [x] add item from search suggestion prompt
- [x] Checklists - Basics

  > List of components:

  1. Checklist item in shopping list
     - Checkbox (default unchecked), Item name, Qty controls, list-position-control-button
  2. Checklist item in planning section
     - Checkbox (default unchecked), Item name, last-bought-stat
  3. Shopping list container
     - capability to move the list item to different positions
     - displays all items that are "unchecked" in the db
  4. Planning list container
     - displays all items that are "checked" in the db
     - The list containers in shopping list section and "All" section in planning view can be two components.

  - [x] Display unchecked in shopping list
    - [x] Add quantity display and control
  - [x] Display checked under planning section

- [x] Click on text in planning checklist to check
- [x] planning list should be sorted in alphabetical order
- [x] Planning section checklists should scroll
- [x] IMPORTANT: **create data generation script like for ABAP for test and demo (especially for checked time info)**
- [x] last bought text styling
- [x] Store checked information in db
- [x] Text search to uncheck an item if it is checked
- [x] List/Stats slider on top
- [x] Stats page skeleton
- [x] Implement last bought computation logic
  - [x] Store last checked data
  - [x] Store last unchecked datetime
- [x] `5` QR Scan to uncheck an item if it is checked
- [x] `5` Implement item average duration computation logic
- [x] `3` Add recommendation section in planning
- [x] `1` Stats page api - mocked json backend
- [x] `2` Call stats api
- [x] `3` Skeleton loading for items in stats page.
- [x] `4` Min view with one product and details
- [x] `5` Max view with three products and details
- [x] Add valid data in backend
- [x] Handling for new item on scan
- [x] Handling for no items in shopping list/planning list

---

- [ ] `3` Delete item
- [ ] `4` Settings screen
  - [ ] `3` Camera switcher settings dropdown
  - [ ] `2` Switch checkbox position toggle setting
  - [ ] `2` Recommendations count/toggle on off
    - this can be completely achieved by using the slice max value on the SetReccomendations function call in the useEffect in Planning.js. Set it to 0 to turn off recommendations.
- [ ] `4` use css variables for colors globally
- [ ] `4` Try to save shopping list item position in db
  - if we can implement update db as an overwrite of items state, then the order may be preserved
- [ ] `2` planning section divider fix, use SVGs of corners instead of spacer
- [ ] `1` lock screen-zooming
- [ ] `3` Update Item quantity info
- [x] `1` update manifest theme color for status bar color

- [ ] `4` Bug fixes
  - [x] `4` Search bug - sometimes you need to click twice on search result for it to be checked
    - [x] Following that, all items are listed in the search suggestions
  - [ ] `4` Shopping list reorder bug
