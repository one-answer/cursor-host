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
          <div className="text-center p-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2 text-muted">Fetching domain information...</p>
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
                  {item.ip}
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