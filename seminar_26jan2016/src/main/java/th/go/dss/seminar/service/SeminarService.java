package th.go.dss.seminar.service;

import th.go.dss.seminar.model.Organization;

public interface SeminarService {

	void saveOrganization(Organization org);

	Iterable<Organization> findAllOrganization();

	Organization findOrganizationByUsernameAndPassword(String username, String password);

	Organization findOrganizationById(Long id);

}
