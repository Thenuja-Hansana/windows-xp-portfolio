import AboutApp from '../components/apps/AboutApp'
import AboutMeApp from '../components/apps/AboutMeApp'
import MyInterestApp from '../components/apps/MyInterestApp'
import ProjectsApp from '../components/apps/ProjectsApp'
import SkillsApp from '../components/apps/SkillsApp'
import ContactApp from '../components/apps/ContactApp'
import MediaPlayerApp from '../components/apps/MediaPlayerApp'
import PaintApp from '../components/apps/PaintApp'
import RecycleApp from '../components/apps/RecycleApp'
import MyComputerApp from '../components/apps/MyComputerApp'

export const APPS_CONFIG = {
    about: {
        id: 'about',
        title: 'Resume — PDF Viewer',
        icon: '📄',
        width: 600,
        height: 500,
        address: 'C:\\Portfolio\\Resume.txt',
        menuItems: ['File', 'Edit', 'Format', 'View', 'Help'],
        Component: AboutApp,
    },
    projects: {
        id: 'projects',
        title: 'My Projects — Windows Explorer',
        icon: '📁',
        width: 700,
        height: 520,
        address: 'My Projects',
        menuItems: ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'],
        hasSidebar: true,
        Component: ProjectsApp,
    },
    skills: {
        id: 'skills',
        title: 'Skills & Technologies',
        icon: '⚙️',
        width: 520,
        height: 460,
        address: 'C:\\Portfolio\\Experience',
        menuItems: ['View', 'Help'],
        Component: SkillsApp,
    },
    aboutme: {
        id: 'aboutme',
        title: 'About Me — Portfolio',
        icon: '👤',
        width: 640,
        height: 520,
        address: 'C:\\MyComputer\\About me',
        menuItems: ['File', 'View', 'Help'],
        Component: AboutMeApp,
    },
    myinterest: {
        id: 'myinterest',
        title: 'My Interest — Portfolio',
        icon: '🌟',
        width: 680,
        height: 520,
        address: 'C:\\MyComputer\\My Interest',
        menuItems: ['File', 'View', 'Help'],
        Component: MyInterestApp,
    },
    contact: {
        id: 'contact',
        title: 'Contact Me — Internet Explorer',
        icon: '🌐',
        width: 580,
        height: 480,
        address: 'http://portfolio/contact',
        menuItems: ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'],
        Component: ContactApp,
    },
    mediaplayer: {
        id: 'mediaplayer',
        title: 'Windows Media Player',
        icon: '🎵',
        width: 640,
        height: 500,
        address: 'Windows Media Player',
        menuItems: ['File', 'View', 'Play', 'Tools', 'Help'],
        Component: MediaPlayerApp,
    },
    paint: {
        id: 'paint',
        title: 'untitled — Paint',
        icon: '🎨',
        width: 640,
        height: 500,
        address: 'C:\\Portfolio\\untitled.bmp',
        menuItems: ['File', 'Edit', 'View', 'Image', 'Colors', 'Help'],
        Component: PaintApp,
    },
    recycle: {
        id: 'recycle',
        title: 'Recycle Bin',
        icon: '🗑️',
        width: 520,
        height: 400,
        address: 'Recycle Bin',
        menuItems: ['File', 'Edit', 'View', 'Help'],
        hasSidebar: true,
        Component: RecycleApp,
    },
    mycomputer: {
        id: 'mycomputer',
        title: 'My Computer',
        icon: '💻',
        width: 620,
        height: 480,
        address: 'My Computer',
        menuItems: ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'],
        hasSidebar: true,
        Component: MyComputerApp,
    },
}

