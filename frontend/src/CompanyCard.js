import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";


class CompanyCard extends Component {
  render() {
    let { company } = this.props;
    let companyPage = `/companies/${company.handle}`;

    return (
      <div>
        <div className="companyCard my-2">
          <Link to={companyPage}>
            <div className="card-body">
              <h5 className="card-title">{company.name}</h5>
              <p className="card-text">{company.description}</p>
              <img style={{"max-width": "200px"}}src={company.logo_url} />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default CompanyCard;