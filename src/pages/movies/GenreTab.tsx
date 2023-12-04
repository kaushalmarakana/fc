import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {genresSelectionUpdate} from '../../redux/actions/genresActions';
import {moviesListReset} from '../../redux/actions/moviesActions';
import {GenreType, Nullable} from '../../types';
import COLORS from '../../theme/colors';

type Props = {
  item: GenreType;
  isSelected: Nullable<boolean>;
};

const GenreTab: React.FC<Props> = ({item, isSelected}) => {
  const dispatch = useDispatch();

  const onPressGenre = () => {
    dispatch(moviesListReset());
    dispatch(genresSelectionUpdate(item));
  };

  return (
    <TouchableOpacity
      onPress={onPressGenre}
      style={[styles.container, isSelected && styles.activeTab]}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tabBgColor,
    marginHorizontal: 10,
  },
  activeTab: {
    backgroundColor: COLORS.activeTabColor,
  },
  title: {
    color: COLORS.tabTitleColor,
    includeFontPadding: false,
  },
});

export default React.memo(GenreTab);
