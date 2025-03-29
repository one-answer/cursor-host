import React from 'react';
import { Card, ListGroup, Badge, Spinner } from 'react-bootstrap';

const DomainList = ({ domains, loading }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Header>
        <h5 className="mb-0">Domain IP Addresses</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {loading && domains.length === 0 ? (
          <div className="text-center p-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3 text-muted">Fetching domain information...</p>
          </div>
        ) : domains.length === 0 ? (
          <div className="text-center p-5">
            <p className="text-muted">No domains loaded yet.</p>
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
                    </span>
                  ) : (
                    <span className="d-flex align-items-center">
                      <span className="me-2 text-danger">
                        <i className="bi bi-exclamation-triangle"></i>
                      </span>
                      Failed to resolve
                    </span>
                  )}
                </div>
              </div>
              <Badge 
                bg={item.status === 'success' ? 'success' : 'danger'}
                className="ms-2"
              >
                {item.status === 'success' ? 'Resolved' : 'Failed'}
              </Badge>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Card>
  );
};

export default DomainList;