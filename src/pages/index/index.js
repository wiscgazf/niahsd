/**
 * @Descripttion: index
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-13 10:21:20
 * @LastEditors: zf
 * @LastEditTime: 2021-08-13 10:21:20
 */

import React from 'react';
import ReactDom from 'react-dom';
import './index.scss';

import LiItem from '@/components/LiItem';
import Xiaomai from '@/assets/image/xiaomai.jpg';

function Index() {
    return (
        <div>
            <img src={Xiaomai} alt="" />
            <LiItem />
        </div>
    );
}

ReactDom.render(<Index />, document.getElementById('app'));
