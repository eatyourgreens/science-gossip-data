import PageMetadata from './components/PageMetadata.js';
import SubjectImg from './components/SubjectImg.js';
import SVGMark from './components/SVGMark.js';
import SVGSubject from './components/SVGSubject.js';
import cssTransforms from './transforms/postcss.js';

export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./site/scss/');
  eleventyConfig.setDataDeepMerge(false);
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");

  eleventyConfig.addTransform('postcss', cssTransforms);

  eleventyConfig.addShortcode("PageMetadata", PageMetadata);
  eleventyConfig.addShortcode("SubjectImg", SubjectImg);
  eleventyConfig.addShortcode("SVGMark", SVGMark);
  eleventyConfig.addPairedShortcode("SVGSubject", SVGSubject);

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "./site",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
}