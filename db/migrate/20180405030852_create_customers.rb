class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :contact
      t.text :note

      t.timestamps
    end
  end
end
