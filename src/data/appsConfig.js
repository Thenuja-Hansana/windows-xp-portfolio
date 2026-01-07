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
        title: 'About Me — Notepad',
        icon: '📄',
        width: 680,
        height: 520,
        Component: AboutApp,
    },
    projects: {
        id: 'projects',
        title: 'My Projects — Windows Explorer',
        icon: '📁',
        width: 840,
        height: 600,
        Component: ProjectsApp,
    },
    skills: {
        id: 'skills',
        title: 'Experience & Technologies',
        icon: '⚙️',
        width: 640,
        height: 540,
        Component: SkillsApp,
    },
    aboutme: {
        id: 'aboutme',
        title: 'About Me — Portfolio',
        icon: '👤',
        width: 640,
        height: 520,
        Component: AboutMeApp,
    },
    myinterest: {
        id: 'myinterest',
        title: 'My Interest — Portfolio',
        icon: '🌟',
        width: 680,
        height: 520,
        Component: MyInterestApp,
    },
    contact: {
        id: 'contact',
        title: 'Contact Me — Internet Explorer',
        icon: '🌐',
        width: 700,
        height: 560,
        Component: ContactApp,
    },
    mediaplayer: {
        id: 'mediaplayer',
        title: 'Windows Media Player',
        icon: '🎵',
        width: 520,
        height: 440,
        Component: MediaPlayerApp,
    },
    paint: {
        id: 'paint',
        title: 'untitled — Paint',
        icon: '🎨',
        width: 760,
        height: 580,
        Component: PaintApp,
    },
    recycle: {
        id: 'recycle',
        title: 'Recycle Bin',
        icon: '🗑️',
        width: 520,
        height: 380,
        Component: RecycleApp,
    },
    mycomputer: {
        id: 'mycomputer',
        title: 'My Computer',
        icon: '💻',
        width: 700,
        height: 500,
        Component: MyComputerApp,
    },
}
