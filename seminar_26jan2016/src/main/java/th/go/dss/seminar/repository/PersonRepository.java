package th.go.dss.seminar.repository;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import th.go.dss.seminar.model.Person;

public interface PersonRepository extends QueryDslPredicateExecutor<Person>, PagingAndSortingRepository<Person, Long> {

}
