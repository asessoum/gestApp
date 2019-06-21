package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Employe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Employe entity.
 */
@Repository
public interface EmployeRepository extends JpaRepository<Employe, Long> {

    @Query(value = "select distinct employe from Employe employe left join fetch employe.langues",
        countQuery = "select count(distinct employe) from Employe employe")
    Page<Employe> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct employe from Employe employe left join fetch employe.langues")
    List<Employe> findAllWithEagerRelationships();

    @Query("select employe from Employe employe left join fetch employe.langues where employe.id =:id")
    Optional<Employe> findOneWithEagerRelationships(@Param("id") Long id);

}
