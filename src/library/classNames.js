export default function classNames(names) {
  const classes = [];
  for (const [key, value] of Object.entries(names)) {
    if (!!value) {
      classes.push(key);
    }
  }
  return classes.join(' ');
}
