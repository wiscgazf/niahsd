/**
 * @Descripttion: LiItem
 * @version: 1.0.0
 * @Author: zf
 * @Date: 2021-08-16 11:50:49
 * @LastEditors: zf
 * @LastEditTime: 2021-08-16 11:50:49
 */

import React from 'react';

function LiItem() {
    return (
        <ul>
            {Array.from({ length: 8 }).map((item, idx) => (
                <li key={idx}>{item || idx}</li>
            ))}
        </ul>
    );
}

export default LiItem;
