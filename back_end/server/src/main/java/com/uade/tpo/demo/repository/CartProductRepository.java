package com.uade.tpo.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uade.tpo.demo.entity.CartProduct;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    List<CartProduct> findByCartIdAndProductId(Long cartId, Long productId);
}
