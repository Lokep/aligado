import React from 'react';
import '../style/ContributeRecords.less';
import COMMIT from '../../../src/assets/commit.json';
import RECOMMAND from '../../../src/assets/recommand.json';
import { Timeline, Avatar, Space, Card, Link, Typography } from '@arco-design/web-react';
import { IconArrowRight } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';

const TimelineItem = Timeline.Item;

const Content = ({ children, icon, name, url, desc }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', color: '#1D2129' }}>
        <Avatar style={{ marginRight: 8, backgroundColor: '#165DFF' }} size={28}>
          <img alt="avatar" src={icon} />
        </Avatar>
        <Typography.Text>{name}</Typography.Text>
      </div>
      {children}
    </div>
  );
};

export default class ContributeRecords extends React.Component {
  render() {
    return (
      <div
        className="contribute"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
        }}
      >
        <div className="contribute-reocrds">
          <h3>更新记录</h3>
          <Timeline>
            {COMMIT.slice(0, 10).map((item) => (
              <TimelineItem dotColor="#00B42A" key={item.commit}>
                <Space>
                  <Avatar style={{ backgroundColor: '#3370ff' }} size={32} shape="square">
                    {item.author.slice(0, 1).toUpperCase()}
                  </Avatar>
                  <div>
                    {item.message}
                    <div style={{ fontSize: 12, color: '#4E5969' }}>
                      {dayjs(item.date).format('YYYY-MM-DD hh:mm:ss')}
                    </div>
                  </div>
                </Space>
              </TimelineItem>
            ))}
          </Timeline>

          {/* <img style={{ display: 'block', position: 'sticky', top: 70, width: '50%' }} src={WELCOME} alt="welcome" /> */}
        </div>
        <div className="recommand" style={{ position: 'sticky', top: 70 }}>
          <h3>推荐阅读</h3>
          <Space direction="vertical">
            {RECOMMAND.filter((item) => item.url).map((item, index) => (
              <Card
                className="card-with-icon-hover"
                hoverable
                key={index}
                style={{ width: 360 }}
                onClick={() => window.open(item.url)}
              >
                <Content {...item}>
                  <span className="icon-hover">
                    <IconArrowRight style={{ cursor: 'pointer' }} />
                  </span>
                </Content>
              </Card>
            ))}
          </Space>
        </div>
      </div>
    );
  }
}
