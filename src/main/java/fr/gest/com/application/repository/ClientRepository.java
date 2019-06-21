package fr.gest.com.application.repository;

import fr.gest.com.application.domain.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Client entity.
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "select distinct client from Client client left join fetch client.adresses",
        countQuery = "select count(distinct client) from Client client")
    Page<Client> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct client from Client client left join fetch client.adresses")
    List<Client> findAllWithEagerRelationships();

    @Query("select client from Client client left join fetch client.adresses where client.id =:id")
    Optional<Client> findOneWithEagerRelationships(@Param("id") Long id);

}
