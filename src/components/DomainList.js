import React from 'react';
import { Card, ListGroup, Badge, Spinner } from 'react-bootstrap';

const DomainList = ({ domains, loading }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Header>
        <h5 className="mb-0">域名 IP 地址</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {loading && domains.length === 0 ? (
          <div className="text-center p-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">正在获取域名信息...</p>
          </div>
        ) : domains.length === 0 ? (
          <div className="text-center p-5">
            <p className="text-muted">尚未加载域名。</p>
          </div>
        ) : (
          domains.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="domain-list-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-bold">{item.domain}</div>
                <div className="text-muted small">
                  {item.status === 'success' ? (
                    <span className="d-flex align-items-center">
                      <span className="me-2" style={{ color: '#0069d9' }}>
                        <i className="bi bi-hdd-network"></i>
                      </span>
                      {item.ip}
                      {item.category && item.category !== 'Cursor' && (
                        <span className="ms-2 badge bg-light text-dark border">
                          <small>{item.category === 'Cursor' ? 'Cursor' : item.category === 'Windsurf' ? 'Windsurf' : '增强代码'}</small>
                        </span>
                      )}
                    </span>
                  ) : (
                    <span className="d-flex align-items-center">
                      <span className="me-2 text-danger">
                        <i className="bi bi-exclamation-triangle"></i>
                      </span>
                      解析失败
                    </span>
                  )}
                </div>
              </div>
              <Badge
                bg={item.status === 'success' ? 'success' : 'danger'}
                className="ms-2"
              >
                {item.status === 'success' ? '成功' : '失败'}
              </Badge>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default DomainList;