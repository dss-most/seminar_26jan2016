package th.go.dss.seminar.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import th.go.dss.seminar.model.Organization;
import th.go.dss.seminar.model.Person;
import th.go.dss.seminar.model.QOrganization;
import th.go.dss.seminar.repository.OrganizationRepository;
import th.go.dss.seminar.repository.PersonRepository;
import th.go.dss.seminar.repository.RegistrationRepository;

@Service
@Transactional
public class SeminarServiceJpa implements SeminarService {

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private OrganizationRepository orgRepo;
	
	@Autowired
	private RegistrationRepository regRepo;
	
	@Autowired
	private PersonRepository personRepo;
	
	
	
	@Override
	public Organization findOrganizationById(Long id) {
		
		return orgRepo.findOne(id);
	}

	@Override
	public Iterable<Organization> findAllOrganization() {
		Iterable<Organization> orgs = orgRepo.findAll();
		for(Organization o: orgs) {
			
			o.getPeople().size();
			log.info("org people size: " +o.getPeople().size());
		}
		
		return orgs;
	}

	@Override
	public void saveOrganization(Organization org) {
		if(org.getPeople() != null && org.getPeople().size() >0) {
			for(Person p : org.getPeople()) {
				log.info("saving person");
				personRepo.save(p);
				
				log.info("saving repo");
				regRepo.save(p.getRegistration());
			}
		}
		
		orgRepo.save(org);

	}

	@Override
	public Organization findOrganizationByUsernameAndPassword(String username, String password) {
		QOrganization q = QOrganization.organization;
		return orgRepo.findOne(q.username.eq(username).and(q.password.eq(password)));
	}

	
	
}
