package th.go.dss.seminar.repository;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import th.go.dss.seminar.model.Organization;

public interface OrganizationRepository extends QueryDslPredicateExecutor<Organization>, PagingAndSortingRepository<Organization, Long> {

}
