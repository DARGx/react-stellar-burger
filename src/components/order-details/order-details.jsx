import PropTypes from 'prop-types'
import doneImg from '../../images/done.svg';
import styles from './order-details.module.css'
import cn from 'classnames'

export const OrderDetails = () => {
  return (
    <section className={styles.order_details}>
      <h2 className={cn(styles.text, styles.digits, 'mb-8 text text_type_digits-large')}>034536</h2>
      <h3 className={cn(styles.text, 'mb-15 text text_type_main-medium')}>идентификатор заказа</h3>
      <img className={styles.icon} src={doneImg} alt="Заказ принят" />
      <p className={cn(styles.text, 'mt-15 mb-2 text text_type_main-default')}>Ваш заказ начали готовить</p>
      <p className={cn(styles.text, 'mb-30 text text_type_main-default text_color_inactive')}>Дождитесь готовности на орбитальной станции</p>
    </section>
  )
}

OrderDetails.propTypes = {
  data: PropTypes.bool
}

export default OrderDetails;