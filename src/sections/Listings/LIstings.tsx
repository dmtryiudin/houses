import React from 'react';
import { server, useQuery } from '../../lib/api/index';
import { Listing } from './types';
import { List, Button, Spin, Row, Col, Alert, Avatar, Skeleton } from 'antd';

interface ListingsProps {
  title: string;
}

export const Listings: React.FC<ListingsProps> = ({ title }) => {
  const [{ loading, data, error }, refetch] = useQuery<Listing[]>();

  const deleteListing = async (id: string) => {
    await server.delete(id);
    refetch();
  };

  if (error) {
    return (
      <Alert
        message='Error'
        type='error'
        description='Something went wrong, try again later ￣\_(0_o)_/￣'
        showIcon></Alert>
    );
  }

  if (loading) {
    return (
      <>
        <Row
          style={{ height: '100vh' }}
          justify='space-around'
          align='middle'>
          <Col>
            <Spin size='large' />
          </Col>
        </Row>
      </>
    );
  }
  return (
    <div className='p-4 dark:bg-neutral-500'>
      <h2 className='mb-4 text-4xl text-text-color-1'>{title}</h2>
      <List
        className=''
        bordered
        dataSource={data ? data : []}
        style={{ boxShadow: 'var(--shadow-1)' }}
        renderItem={(elem) => {
          return (
            <List.Item
              actions={[
                <Button onClick={() => deleteListing(elem.id)}>Delete</Button>,
              ]}>
              <Skeleton
                avatar
                active
                loading={false}>
                <List.Item.Meta
                  key={elem.id}
                  title={elem.title}
                  description={elem.address}
                  avatar={
                    <Avatar
                      src={elem.image}
                      shape='square'
                      size={80}
                    />
                  }
                />
              </Skeleton>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
