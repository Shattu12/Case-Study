package com.example.test.model;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Field;

public class Item {
		@Id
		private String id;
		@Field("name")
		private String itemName;
		@Field("description")
		@Indexed(unique = true)
		private String itemDesc;
		@Field("price")
		private int itemPrice;
		@Field("size")
		private String itemSize;
		@Field("Image")
		private String itemImage;
		@Field("type")
		private String itemType;
		@Field("category")
		private String itemCategory;
		@CreatedDate
	    private Date createdAt=new Date();
	    @LastModifiedDate
	    private LocalDateTime lastModified;
		
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getItemName() {
			return itemName;
		}
		public void setItemName(String itemName) {
			this.itemName = itemName;
		}
		public String getItemDesc() {
			return itemDesc;
		}
		public void setItemDesc(String itemDesc) {
			this.itemDesc = itemDesc;
		}
		public int getItemPrice() {
			return itemPrice;
		}
		public void setItemPrice(int itemPrice) {
			this.itemPrice = itemPrice;
		}
		public String getItemSize() {
			return itemSize;
		}
		public void setItemSize(String itemSize) {
			this.itemSize = itemSize;
		}
		public String getItemImage() {
			return itemImage;
		}
		public void setItemImage(String itemImage) {
			this.itemImage = itemImage;
		}
		public String getItemType() {
			return itemType;
		}
		public void setItemType(String itemType) {
			this.itemType = itemType;
		}
		public String getItemCategory() {
			return itemCategory;
		}
		public void setItemCategory(String itemCategory) {
			this.itemCategory = itemCategory;
		}
		@Override
		public String toString() {
			return "Item [id=" + id + ", itemName=" + itemName + ", itemDesc=" + itemDesc + ", itemPrice=" + itemPrice
					+ ", itemSize=" + itemSize + ", itemImage=" + itemImage + ", itemType=" + itemType
					+ ", itemCategory=" + itemCategory + "]";
		}
		public Date getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}
		public LocalDateTime getLastModified() {
			return lastModified;
		}
		public void setLastModified(LocalDateTime lastModified) {
			this.lastModified = lastModified;
		}

}
