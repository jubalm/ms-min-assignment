import React from 'react';
import { connect } from 'react-redux';
import { toggleMinSelect, setDefaultMin } from '../actions';
import styles from './style.module.css';

const AssignMINToBranch = ({ mins, toggle, setDefault }) => {
  const handleSelect = (e) => {
    toggle(e.target.value);
  };

  const handleSetDefault = (e) => {
    setDefault(e.target.id);
  };

  return (
    <div className={styles.fieldset}>
      <h3 className={styles.fieldsetTitle}>Assign MINs to branch</h3>
      <div className={styles.panels}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>Dealer MINs</div>
            <div>Set as default</div>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.simList}>
              {mins.filter(m=> m.type === 'dealer').map((min) => {
                return (
                  <div
                    className={`${styles.listItem} ${styles.simListItem}`}
                    key={min.id}
                  >
                    <input
                      type="checkbox"
                      checked={min.selected}
                      value={min.id}
                      onChange={handleSelect}
                    />
                    <span className={styles.listItemLabel}>{min.id}</span>
                    {min.selected ? (
                      <button
                        disabled={min.default}
                        className={styles.defaultButton}
                        id={min.id}
                        onClick={handleSetDefault}
                      >
                        Default
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>Retailer MINs</div>
            <div>Set as default</div>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.simList}>
              {mins.filter(m=> m.type === 'retailer').map((min) => {
                return (
                  <div
                    className={`${styles.listItem} ${styles.simListItem}`}
                    key={min.id}
                  >
                    <input
                      type="checkbox"
                      checked={min.selected}
                      value={min.id}
                      onChange={handleSelect}
                    />
                    <span className={styles.listItemLabel}>{min.id}</span>
                    {min.selected ? (
                      <button
                        disabled={min.default}
                        className={styles.defaultButton}
                        id={min.id}
                        onClick={handleSetDefault}
                      >
                        Default
                      </button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h4>Summary</h4>
          </div>
          <div className={styles.panelBody}>
            <h5 className={styles.bodyTitle}>Default MIN</h5>
            <div>
              {mins
                .filter((min) => !!min.default)
                .map((min) => (
                  <div className={styles.listItem} key={min.id}>
                    {min.id}
                  </div>
                ))}
            </div>
            <h5 className={styles.bodyTitle}>Secondary MIN</h5>
            <div>
              {mins
                .filter((min) => min.selected && !min.default)
                .map((min) => (
                  <div className={styles.listItem} key={min.id}>
                    {min.id}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  mins: state.mins,
});

const mapDispatchToProps = (dispatch) => ({
  toggle: (id) => dispatch(toggleMinSelect(id)),
  setDefault: (id) => dispatch(setDefaultMin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignMINToBranch);
