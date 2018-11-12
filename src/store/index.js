import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

import dingStatus from './dingStatus.js';

export default new vuex.Store({
    /*全局状态*/
    state: {
        pickerOptions2: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },
    },
    /*局部状态*/
    modules:{
        ding:dingStatus
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    }
});
