import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssAdvancedVariables from '@knagis/postcss-advanced-variables';
import postcssNested from 'postcss-nested';
import postcssSCSS from 'postcss-scss';

const
  postcssPlugins = [
    postcssAdvancedVariables,
    postcssNested,
    cssnano
  ],
  postcssOptions = {
    from: 'site/scss/entry.scss',
    syntax: postcssSCSS
  };

export default async function (content) {

  if (!this.outputPath.endsWith('.css')) return content;

  return (
    await postcss(postcssPlugins).process(content, postcssOptions)
  ).css;

};