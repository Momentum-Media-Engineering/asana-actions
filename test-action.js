
process.env['INPUT_TASK_ID'] = '1209575340228976';
process.env['INPUT_COMMENT'] = 'Test comment from local mock2';
process.env['INPUT_HTML_TEXT'] = '<body>Test formatted comment 2</body>';
process.env['INPUT_AUTH_TOKEN'] = 'eyJ1c2VyX2lkIjoieXVhbi55aXp1bkBtb21lbnR1bW1lZGlhLmNvbS5hdSIsImlhdCI6MTc0MjUxMTA5OH0=.379b87ab41a7c0538a3d18d003d49ff0414053151491e032ae994028eec653b6';
//run index.js
require('./dist/index.js');
