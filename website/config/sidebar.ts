const sidebar = [
  'intro',
  'start',
  {
    Basics: [
      'basics/navigation',
      'basics/customization',
      'basics/selecting-days',
      'basics/styling'
    ]
  },
  {
    Guides: [
      'guides/modifiers',
      'guides/custom-selection',
      'guides/formatters',
      'guides/localization',
      'guides/form-fields',
      'guides/custom-components'
    ]
  },
  { 'API Reference': require('./typedoc-sidebar.ts') },
  'changelog',
  'contributing',
  'license'
];

module.exports = { sidebar };
