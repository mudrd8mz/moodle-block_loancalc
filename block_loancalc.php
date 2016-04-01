<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Provides the block_loancalc class.
 *
 * @package     block_loancalc
 * @copyright   2016 David Mudrak <david@moodle.com>
 * @copyright   2013 Arnaud Trouvé <ak4t0sh@free.fr>
 * @copyright   2005 Penny Leach <penny@mahara.org>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Loan calculator block class.
 *
 * @copyright   2016 David Mudrak <david@moodle.com>
 * @copyright   2013 Arnaud Trouvé <ak4t0sh@free.fr>
 * @copyright   2005 Penny Leach <penny@mahara.org>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class block_loancalc extends block_base {

    /**
     * Initialize the block.
     */
    public function init() {
        $this->title = get_string('loancalc', 'block_loancalc');
    }

    /**
     * Generate and return the block content.
     *
     * @return string
     */
    public function get_content() {

        if ($this->content !== null) {
            return $this->content;
        }

        $output = $this->page->get_renderer('block_loancalc');

        $this->content = (object)[
            'text' => $output->content_text(),
            'footer' => $output->content_footer(),
        ];

        return $this->content;
    }
}
