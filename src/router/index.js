import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'

import Login1 from '@/components/useless/Login1'
import Login2 from '@/components/useless/Login2'
import Login3 from '@/components/useless/Login3'
import Login4 from '@/components/useless/Login4'
import TabsDemo from '@/components/useless/TabsDemo'
import Pager from '@/components/useless/Pager'
import Reg1 from '@/components/useless/Reg1'
import Reg2 from '@/components/useless/Reg2'
import Reg3 from '@/components/useless/Reg3'
import OnlineCodeDemo from '@/components/useless/OnlineCodeDemo'
import DownloadDemo from '@/components/useless/DownloadDemo'
import UploadDemo from '@/components/useless/UploadDemo'
import ProvinceCityDemo from '@/components/useless/ProvinceCityDemo'

import Index from '@/components/pc/Index'
import Login from '@/components/pc/Login'
import Reg from '@/components/pc/Reg'
import Tabs from '@/components/pc/Tabs'
import UpAndDown from '@/components/pc/UpAndDown'
import Video from '@/components/pc/Video'
import Audio from '@/components/pc/Audio'
import MyMavonEditor from '@/components/pc/MyMavonEditor'
import OnlineCode from '@/components/pc/OnlineCode'
import ArticleContent from '@/components/pc/ArticleContent'
import PersonalCenter from '@/components/pc/PersonalCenter'
import MyWangEditor from '@/components/pc/MyWangEditor'

import IndexMobile from '@/components/mobile/IndexMobile'
import LoginMobile from '@/components/mobile/LoginMobile'
import RegMobile from '@/components/mobile/RegMobile'
import Panel from '@/components/mobile/Panel'
import CenterMobile from '@/components/mobile/CenterMobile'
import ArticleMobile from '@/components/mobile/ArticleMobile'
import VideoMobile from '@/components/mobile/VideoMobile'
import AudioMobile from '@/components/mobile/AudioMobile'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/tabsdemo',
      name: 'TabsDemo',
      component: TabsDemo
    },
    {
      path: '/upAndDown',
      name: 'UpAndDown',
      component: UpAndDown
    },
    {
      path: '/downloadDemo',
      name: 'DownloadDemo',
      component: DownloadDemo
    },
    {
      path: '/pager',
      name: 'Pager',
      component: Pager
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/audio',
      name: 'Audio',
      component: Audio
    },
    {
      path: '/myMavonEditor',
      name: 'MyMavonEditor',
      component: MyMavonEditor
    },
    {
      path: '/onlinecode',
      name: 'OnlineCode',
      component: OnlineCode
    },
    {
      path: '/provinceCityDemo',
      name: 'ProvinceCityDemo',
      component: ProvinceCityDemo
    },
    {
      path: '/login1',
      name: 'Login1',
      component: Login1
    }, {
      path: '/login2',
      name: 'Login2',
      component: Login2
    }, {
      path: '/login3',
      name: 'Login3',
      component: Login3
    }, {
      path: '/login4',
      name: 'Login4',
      component: Login4
    }, {
      path: '/tabs',
      name: 'Tabs',
      component: Tabs
    }, {
      path: '/articleContent',
      name: 'ArticleContent',
      component: ArticleContent
    }, {
      path: '/indexMobile',
      name: 'IndexMobile',
      component: IndexMobile
    }, {
      path: '/loginMobile',
      name: 'LoginMobile',
      component: LoginMobile
    }, {
      path: '/regMobile',
      name: 'RegMobile',
      component: RegMobile
    }, {
      path: '/reg1',
      name: 'Reg1',
      component: Reg1
    }, {
      path: '/reg2',
      name: 'Reg2',
      component: Reg2
    }, {
      path: '/reg3',
      name: 'Reg3',
      component: Reg3
    }, {
      path: '/onlineCodeDemo',
      name: 'OnlineCodeDemo',
      component: OnlineCodeDemo
    }, {
      path: '/uploadDemo',
      name: 'UploadDemo',
      component: UploadDemo
    }, {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    }, {
      path: '/panel',
      name: 'Panel',
      component: Panel
    }, {
      path: '/centerMobile',
      name: 'CenterMobile',
      component: CenterMobile
    }, {
      path: '/articleMobile',
      name: 'ArticleMobile',
      component: ArticleMobile
    }, {
      path: '/videoMobile',
      name: 'VideoMobile',
      component: VideoMobile
    }, {
      path: '/audioMobile',
      name: 'AudioMobile',
      component: AudioMobile
    }, {
      path: '/myWangEditor',
      name: 'MyWangEditor',
      component: MyWangEditor
    }
  ]
})
