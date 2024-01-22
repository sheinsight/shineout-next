import { usePersistFn } from '../../common/use-persist-fn';
import type { ObjectType } from '../../common/type';
import type { BaseCollapseType } from './use-collapse-item.type';

const useCollapseItem = (props: BaseCollapseType) => {
  const { active, keygen, triggerRegion, disabled, onChange } = props;
  const judgeExpanded = active.indexOf(keygen) > -1;
  const currentDisabled = triggerRegion === 'disabled' || disabled;

  type clickByReginType = React.MouseEvent<HTMLDivElement, MouseEvent>;
  const handleClickByRegion = usePersistFn((e: clickByReginType, regionKey: 0 | 1 | 2) => {
    if (currentDisabled) return;
    const triggerKey = triggerRegion === 'icon' ? 0 : triggerRegion === 'header' ? 1 : 2;
    if (regionKey === triggerKey || (triggerRegion === 'header' && [0, 1].includes(regionKey)))
      onChange(keygen, e);
  });

  const getItemContentProps = <TOther extends ObjectType>(
    externalProps: TOther = {} as TOther,
  ) => ({
    ...externalProps,
    'data-soui-disabled': !!currentDisabled,
    tabIndex: currentDisabled ? -1 : 0,
    onClick: (e: clickByReginType) => handleClickByRegion(e, 2),
  });

  const getHeaderIconProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => ({
    ...externalProps,
    onClick: (e: clickByReginType) => handleClickByRegion(e, 0),
  });

  const getTitleProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => ({
    ...externalProps,
    onClick: (e: clickByReginType) => handleClickByRegion(e, 1),
  });

  const getExtraProps = <TOther extends ObjectType>(externalProps: TOther = {} as TOther) => ({
    ...externalProps,
    onClick: (e: clickByReginType) => e.stopPropagation(),
  });

  return {
    judgeExpanded,
    getItemContentProps,
    getHeaderIconProps,
    getTitleProps,
    getExtraProps,
  };
};

export default useCollapseItem;
