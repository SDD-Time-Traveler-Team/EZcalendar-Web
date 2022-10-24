import React, { useState } from 'react';
import {Card} from 'antd';
const Tag = (props) => {
    return (
        <>
            <Card class='color' title={props.title} style={{ width:'90%', marginTop: 5, background: "yellow" }}>
                <p>{props.duration}</p>
            </Card>
        </>
    );
};
export default Tag;
