import type { Badge } from '@navifox/types';

/**
 * 彩色徽章。
 */
export class ColorBadge {

    // -------------------------------- 语言类 --------------------------------

    static readonly Python: Badge = { icon: 'devicon:python' }
    static readonly Kotlin: Badge = { icon: 'devicon:kotlin' }
    static readonly Golang: Badge = { icon: 'devicon:go' }
    static readonly Rust: Badge = { icon: 'catppuccin:rust' }
    static readonly Java: Badge = { icon: 'devicon:java' }
    static readonly JavaScript: Badge = { icon: 'devicon:javascript' }
    static readonly TypeScript: Badge = { icon: 'devicon:typescript' }
    static readonly WebHTML: Badge = { icon: 'catppuccin:html', text: 'HTML' }
    static readonly WebCSS: Badge = { icon: 'devicon:css', text: 'CSS' }
    static readonly Markdown: Badge = { icon: 'catppuccin:markdown' }
    static readonly Bash: Badge = { icon: 'devicon-plain:bash', text: 'bash' }
    static readonly Cmd: Badge = { icon: 'codicon:terminal-cmd', text: 'cmd' }
    static readonly Powershell: Badge = { icon: 'devicon:powershell' }
    static readonly Nushell: Badge = { icon: 'simple-icons:nushell' }

    // -------------------------------- 框架类 --------------------------------

    // 后端开发
    static readonly Django: Badge = { icon: 'skill-icons:django' }
    static readonly DjangoRESTFramework: Badge = { icon: 'devicon:djangorest-wordmark', text: 'Django REST Framework' }
    static readonly Flask: Badge = { icon: 'file-icons:flask' }
    static readonly FastAPI: Badge = { icon: 'devicon:fastapi' }
    static readonly NumPy: Badge = { icon: 'devicon:numpy' }
    static readonly Pandas: Badge = { icon: 'devicon:pandas' }
    static readonly Selenium: Badge = { icon: 'logos:selenium' }
    static readonly Celery: Badge = { icon: 'simple-icons:celery' }
    static readonly Spring: Badge = { icon: 'devicon:spring' }

    // 前端开发
    static readonly TailwindCSS: Badge = { icon: 'devicon:tailwindcss', text: 'Tailwind CSS' }
    static readonly Vue: Badge = { icon: 'devicon:vuejs' }
    static readonly VueUse: Badge = { icon: 'logos:vueuse' }
    static readonly Lodash: Badge = { icon: 'devicon:lodash' }
    static readonly Pinia: Badge = { icon: 'logos:pinia' }
    static readonly Gsap: Badge = { icon: 'simple-icons:gsap', text: 'GSAP' }
    static readonly VitePress: Badge = { icon: 'simple-icons:vitepress' }
    static readonly Bootstrap: Badge = { icon: 'devicon:bootstrap' }
    static readonly Naive: Badge = { icon: 'logos:naiveui' }

    // -------------------------------- 存储类 --------------------------------

    static readonly PostgreSQL: Badge = { icon: 'devicon:postgresql' }
    static readonly SQLite: Badge = { icon: 'devicon:sqlite' }
    static readonly MySQL: Badge = { icon: 'devicon:mysql' }
    static readonly Redis: Badge = { icon: 'devicon:redis' }

    // -------------------------------- 环境类 --------------------------------

    static readonly PyCharm: Badge = { icon: 'logos:pycharm' }
    static readonly IntelliJ: Badge = { icon: 'logos:intellij-idea' }
    static readonly WebStorm: Badge = { icon: 'logos:webstorm' }
    static readonly Goland: Badge = { icon: 'logos:goland' }
    static readonly DataGrip: Badge = { icon: 'logos:datagrip' }
    static readonly VisualStudioCode: Badge = { icon: 'devicon:vscode', text: 'Visual Studio Code' }
    static readonly VisualStudio: Badge = { icon: 'devicon:visualstudio', text: 'Visual Studio' }
    static readonly Ubuntu: Badge = { icon: 'logos:ubuntu' }
    static readonly Kali: Badge = { icon: 'devicon:kalilinux' }

    // -------------------------------- DevOps --------------------------------

    static readonly Git: Badge = { icon: 'devicon:git', text: 'git' }
    static readonly GitHubAction: Badge = { icon: 'devicon:githubactions', text: 'GitHub Action' }
    static readonly Apifox: Badge = { icon: 'simple-icons:apifox' }
    static readonly Grafana: Badge = { icon: 'devicon:grafana' }

    // -------------------------------- 工具类 --------------------------------

    static readonly Vite: Badge = { icon: 'devicon:vitejs' }
    static readonly Npm: Badge = { icon: 'devicon:npm', text: 'NPM' }
    static readonly Pnpm: Badge = { icon: 'devicon:pnpm', text: 'PNPM' }

    // -------------------------------- 杂类 --------------------------------

    static readonly Firefox: Badge = { icon: 'logos:firefox' }
    static readonly Chrome: Badge = { icon: 'logos:chrome' }

    // -------------------------------- --------------------------------

    static {
        for (const [ keyName, value ] of Object.entries(this)) {
            value.text = value?.text ?? keyName
        }
    }

    static get values(): Badge[] {
        return Object.values(this).sort((a: Badge, b: Badge) => a.text!.localeCompare(b.text!))
    }
}
