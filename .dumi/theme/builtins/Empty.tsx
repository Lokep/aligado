import React from 'react';
import { Empty, Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

export default () => (
  <Empty
    imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
    description={<Button type="primary">Refresh</Button>}
  />
);
