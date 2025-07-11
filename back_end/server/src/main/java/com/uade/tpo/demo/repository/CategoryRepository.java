package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.uade.tpo.demo.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "select c from Category c where c.description = ?1")
    List<Category> findByDescription(String description);
}
    

