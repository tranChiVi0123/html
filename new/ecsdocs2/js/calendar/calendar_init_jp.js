Calendar._DN = new Array
(" ��",
 " ��",
 " ��",
 " ��",
 " ��",
 " ��",
 " �y",
 " ��");

// short day names
Calendar._SDN = new Array
("��",
 "��",
 "��",
 "��",
 "��",
 "��",
 "�y",
 "��");

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 0;

// full month names
Calendar._MN = new Array
("1��",
 "2��",
 "3��",
 "4��",
 "5��",
 "6��",
 "7��",
 "8��",
 "9��",
 "10��",
 "11��",
 "12��");

// short month names
Calendar._SMN = new Array
("1��",
 "2��",
 "3��",
 "4��",
 "5��",
 "6��",
 "7��",
 "8��",
 "9��",
 "10��",
 "11��",
 "12��");
// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "help";

Calendar._TT["ABOUT"] ="���t�I��:\n- \xab, \xbb �{�^�����N���b�N���ĔN��I���ł��܂�\n- "+ String.fromCharCode(0x2039) +", "+ String.fromCharCode(0x203a) +  " �{�^�����N���b�N���Č���I���ł��܂�\n- �ȏ�̃{�^���𒷂������ƔN�܂��͌��̃N�C�b�N�T�[�`�ł��܂�";
Calendar._TT["ABOUT_TIME"] = "\n\n���ԑI��:\n- �����͕����N���b�N����ƃv���X1�ɂȂ�܂�\n- Shift�{�����͕����N���b�N����ƃ}�C�i�X1�ɂȂ�܂�\n- �h���b�O����Ƒ��������ł��܂�";
Calendar._TT["PREV_YEAR"] = "�O�N";
Calendar._TT["PREV_MONTH"] = "�O��";
Calendar._TT["GO_TODAY"] = "�����I��";
Calendar._TT["NEXT_MONTH"] = "����";
Calendar._TT["NEXT_YEAR"] = "���N";
Calendar._TT["SEL_DATE"] = "���t�I��";
Calendar._TT["DRAG_TO_MOVE"] = "�E�B���h�E�̈ړ�";
Calendar._TT["PART_TODAY"] = " (����)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "�������ڂɕ\��%s";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "����";
Calendar._TT["TODAY"] = "�����I��";
Calendar._TT["TIME_PART"] = "(Shift-)�N���b�N�܂��̓h���b�O���Ēl��ς���";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Calendar._TT["TT_DATE_FORMAT"] = "%A, %b %e��";

Calendar._TT["WK"] = "�T";
Calendar._TT["TIME"] = "����:";