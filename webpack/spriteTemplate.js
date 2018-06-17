let prefix = "i";
module.exports = function spriteTemplate(data) {
  const out = data.sprites
    .map((sprite) => {
      const name = sprite.name;
      let className = `.${prefix}-${name.replace(/(_hover)|(_disabled)/, "")}`;
      if (name.indexOf("_hover") > 0) {
        className += `_hover, ${className}:hover`;
      }
      if (name.indexOf("_disabled") > 0) {
        className += `_disabled, ${className}:disabled, ${className}.is-disabled, ${className}[disabled], ${className}:disabled:hover, ${className}.is-disabled:hover, ${className}[disabled]:hover`;
      }

      const imageUrl = sprite.image;
      const total_width = sprite.total_width / 100;
      const total_height = sprite.total_height / 100;
      const width = sprite.width / 100;
      const height = sprite.height / 100;
      const offset_x = sprite.offset_x / 100;
      const offset_y = sprite.offset_y / 100;
      const result = `
${className} {
  display: inline-block;
  background-image: url('${imageUrl}');
  background-size: ${total_width}rem ${total_height}rem;
  background-position: ${offset_x}rem ${offset_y}rem;
  width: ${width}rem;
  height: ${height}rem;
}
`;
      return result;
    })
    .join("\n");
  return out;
};
