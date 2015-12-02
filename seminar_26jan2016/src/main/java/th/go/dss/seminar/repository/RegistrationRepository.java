package th.go.dss.seminar.repository;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import th.go.dss.seminar.model.Registration;

public interface RegistrationRepository extends QueryDslPredicateExecutor<Registration>, PagingAndSortingRepository<Registration, Long> {

}
