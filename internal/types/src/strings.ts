/**
 * 超链接。
 *
 * 这个类型表示值可以是
 *
 * - 一个以 `http://` 或 `https://` 开头的字符串；
 * - 一个以 `/` 开头的相对地址；这种情况下，要留意常量所在环境是否支持正确翻译成绝对地址。
 */
export type Hyperlink = string;

/**
 * 图标。
 *
 * 这个类型表示仅支持三种类型的值（虽然无法执行校验）：
 *
 * - `https://` 开头的链接；
 * - `/` 开头的相对地址。这类值要注意所在环境是否支持正确翻译；
 * - [Iconify](https://icon-sets.iconify.design/) 图标集中定义的图标名称（icon name）。
 */
export type IconRepresentation = string;
