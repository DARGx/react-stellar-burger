import React from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import cn from 'classnames';



export const BurgerConstructor = ({ constructorIngredients }) => {
  const buns = constructorIngredients.filter(data => data.type === 'bun')
  const nonBuns = constructorIngredients.filter(data => data.type !== 'bun')
  const [orderModal, setOrderModal] = React.useState(false);
  const handleOrderClick = () => {
    setOrderModal(true);
  };

  return (

    <section className={styles.wrapper}>

      <div className="ml-6 mb-4">
        {buns[0] && <ConstructorElement
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
          type='top'
          isLocked={true} />}
      </div>

      <div className={cn(styles.container, 'custom-scroll')}>
        {nonBuns.map((data, index) => {
          const lastBun = nonBuns.length - 1 === index;

          return (
            <div className={cn(styles.element_item, lastBun ? '' : 'mb-4')} key={data._id}>
              <DragIcon />
              <ConstructorElement
                text={data.name}
                price={data.price}
                thumbnail={data.image} />
            </div>
          )
        }

        )}
      </div>
      <div className="ml-6 mt-4">
        {buns[0] && <ConstructorElement
          text={buns[0].name}
          price={buns[0].price}
          thumbnail={buns[0].image}
          type="bottom"
          isLocked={true} />}
      </div>

      <div className={cn(styles.order_sum)}>
        <div className={styles.order_container}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOrderClick}
        >Оформить заказ
        </Button>
      </div>
      {orderModal && <Modal onClose={() => setOrderModal(false)}>
        <OrderDetails data={orderModal} />
      </Modal>}
    </section>
  )
}

export default BurgerConstructor;

