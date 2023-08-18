import { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Order } from '../../types/order';
import { formatOrderDate } from '../../utils/date';
import { useOrderSum } from '../../hooks/order-sum';
import { useOrderIngredients } from '../../hooks/order-ingredients';
import styles from './order-feed-element.module.css';

interface FeedElementProps  {
  to: string;
  order: Order;
  linkState: { feedModal: true } | { orderModal: true }
}

export const OrderFeedElement: FC<FeedElementProps> = ({ to, order, linkState }) => {
  const sum = useOrderSum(order);

  const orderIngredientsImage = useOrderIngredients(order);
  const orderDate = formatOrderDate(order.createdAt);

  return (
    <Link className={styles.container} to={to} state={linkState}>
      <div className={styles.digits}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className={"text text_type_main-default text_color_inactive"}
        >{orderDate}</p>
      </div>
      <h2 className="text text_type_main-medium">{order.name}</h2>
      <div className={styles.compound}>
        <div className={styles.items}>
          {orderIngredientsImage.map((image, index) => {
            const key = `${image._id}_${index}`; 
            return (
              <div className={styles.item__container} key={key}>
                <img
                  src={image.image_mobile}
                  className={styles.image}
                  alt={image.name}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{sum}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderFeedElement;
