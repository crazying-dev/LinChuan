import type { Hyperlink, IconRepresentation } from './strings';

/**
 * 链接信息。
 */
export interface LinkInfo {

    /** 链接地址。 */
    link: Hyperlink

    /** 图标链接。 */
    icon?: IconRepresentation

    /** 展示文字。 */
    text?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 站点信息。
 */
export interface WebsiteInfo {

    /** 站点名称。 */
    name: string

    /** 站点首页链接。 */
    link: Hyperlink

    /** 站点图标。 */
    icon?: IconRepresentation

    /** 站点描述。
     *
     * 列宽不足时每一行单独换行。 */
    desc?: string

    /** 其它附加信息。 */
    [key: string]: any
}

/**
 * 项目信息。
 */
export interface ProjectInfo {

    /** 项目名称。 */
    name: string

    /** 项目简介。
     *
     * 渲染时不考虑支持多行文本。 */
    desc: string

    /** 项目文档。 */
    docLink?: Hyperlink

    /**
     * 类型图标。
     *
     * 这里的类型指的是成品的类型或其存在形式，比如说一个
     * npm 包、一个 Python 包，一个 VSCode 插件，等等。 */
    typeIco?: IconRepresentation

    /** 社交链接。 */
    socials?: LinkInfo[]
}
